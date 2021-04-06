type ViewOptions = { baseTitle: string; separator?: string };
interface View {
  getHtml: () => string;
}
interface Route {
  path: string;
  view: View;
  404?: boolean;
}

const pathToRegex = (path: string): RegExp =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const viewFactory = (
  { baseTitle, separator }: ViewOptions = { baseTitle: "", separator: "|" }
) => (markup: string | (() => string), title = "") => {
  const getHtml = (): string => {
    document.title = baseTitle
      ? baseTitle
      : `${baseTitle} ${separator} ${title}`;

    return typeof markup === "function" ? markup() : markup;
  };

  return { getHtml };
};

const createRouter = (routes: Route[], container: HTMLElement) => {
  const hydrateRouter = () => {
    const potencialMatches = routes.map((route) => ({
      route,
      isMatch:
        normalizeString(location.pathname) === normalizeString(route.path),
      result: location.pathname.match(pathToRegex(route.path)),
    }));

    const [route404] = routes.filter((route) => route["404"] === true);

    const [match] = potencialMatches.filter(
      (potecialMatch) => potecialMatch.isMatch && potecialMatch.result !== null
    ) || { route: route404 };
    const { view } = match.route;

    container.innerHTML = view.getHtml();
  };

  const push = (url: string) => {
    history.pushState(null, "", url);
    hydrateRouter();
  };

  const replace = (url: string) => {
    history.replaceState(null, "", url);
    hydrateRouter();
  };

  const routeEvent = () => {
    const links = document.querySelectorAll<HTMLLinkElement>("[data-link]");
    links.forEach((link) => {
      link.addEventListener("click", (evt) => {
        evt.preventDefault();
        const currentLink = evt.target as HTMLLinkElement;

        push(currentLink.href);
      });
    });
  };

  const startRouter = () => {
    hydrateRouter();
    routeEvent();
  };

  startRouter();
  return { hydrateRouter, routeEvent, push, replace };
};
