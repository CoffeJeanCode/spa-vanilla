const app = () => {
  const appContainer = document.getElementById("app");
  const createView = viewFactory({ baseTitle: "SPA Vanilla", separator: "∙" });

  createRouter(
    [
      {
        path: "/",
        view: createView(`<button>Click</button>`, "Home"),
      },
      {
        path: "/blog",
        view: createView(`<h1>BLOG</h1>`, "Blog"),
      },
      {
        path: "/about",
        view: createView(`<h1>ABOUT</h1>`, "About"),
      },
      {
        path: "/play",
        view: createView(`<h1>PLAY</h1>`),
      },
      {
        path: "/404",
        view: createView(`<h1>PAGE NOT FOUND</h1>`, "Page Not Found"),
        404: true,
      },
    ],
    appContainer
  );
};

document.addEventListener("DOMContentLoaded", app);
