/**
 *
 * @param {string} path
 * @returns {RegExp}
 */
const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

/**
 *
 * @param {Object} match
 * @returns {Object}
 */
const getParams = (match) => {
  const values = match.result;
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    ([result]) => result
  );

  return Object.fromEntries(
    keys.map((key, i) => [key.replace(":", ""), values[i].replace(/\//, "")])
  );
};

/**
 *
 * @param {string} markup
 * @returns {{setTitle: Function, getHtml: Function}}
 * @description Create a specializate view
 */
const createView = ({ baseTitle, separator } = {}) => (markup, title = "") => {
  const getHtml = () => {
    document.title = baseTitle
      ? baseTitle
      : `${baseTitle} ${separator} ${title}`;

    if (typeof markup === "function") {
      return markup();
    }

    return markup;
  };

  return { getHtml };
};

const viewFactory = (options) => createView(options);

/**
 *
 * @param {Object} routes
 * @param {HTMLElement} container
 * @returns {Object}
 * @description Make a router switch for use router
 */
const createRouter = (routes, container) => {
  /**
   * @description hydratate the router when change the router the path
   */
  const hydrateRouter = () => {
    const potencialMatches = routes.map((route) => ({
      route,
      isMatch:
        normalizeString(location.pathname) === normalizeString(route.path),
      result: location.pathname.match(pathToRegex(route.path)),
    }));

    const route404 = routes.find((route) => route["404"] === true);

    const match = potencialMatches.find(
      (potecialMatch) => potecialMatch.isMatch && potecialMatch.result !== null
    ) || { route: route404 };
    const { view } = match.route;

    container.innerHTML = view.getHtml();
  };

  /**
   *
   * @param {string} url
   * @description Navigate to from current url to new url history
   */
  const push = (url) => {
    history.pushState(null, null, url);
    hydrateRouter();
  };

  /**
   *
   * @param {string} url
   * @description Replace to from current url to new url history
   */
  const replace = (url) => {
    history.replaceState(null, null, url);
    hydrateRouter();
  };

  /**
   * @description Add a event for element with data-link attribute
   */
  const routeEvent = () => {
    const links = document.querySelectorAll("[data-link]");
    links.forEach((link) => {
      link.addEventListener("click", (evt) => {
        evt.preventDefault();
        push(evt.target.href);
      });
    });
  };
  /**
   * @description Initializate the router in the first execution
   */
  const startRouter = () => {
    hydrateRouter();
    routeEvent();
  };

  startRouter();
  return { hydrateRouter, routeEvent, push, replace };
};
