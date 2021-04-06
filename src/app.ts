const app = () => {
  const appContainer =
    document.getElementById("app-wrapper") || document.createElement("main");
  const createView = viewFactory({ baseTitle: "SPA Vanilla", separator: "∙" });

  const images = [
    {
      title: "Girl in the city",
      src:
        "https://images.unsplash.com/photo-1584299950057-e5410d9d78f3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80",
    },
    {
      title: "Forest",
      src:
        "https://images.unsplash.com/photo-1578575694913-17cc29bdcc14?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=889&q=80",
    },
  ];
  createRouter(
    [
      {
        path: "/",
        view: createView(() => {
          return `
          <div class="container-md">
          <h1>Gallery</h1>
          ${images
            .map(
              (image) => `
                  <img src="${image.src}" alt="${image.title}"/>
                  `
            )
            .join("")}
          </div>
                  `;
        }, "Home"),
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
