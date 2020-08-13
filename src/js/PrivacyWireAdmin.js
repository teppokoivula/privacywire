import Sortable from "sortablejs";

var createElement = function (options) {
  var el
    , a
    , i
  if (!options.tagName) {
    el = document.createDocumentFragment()
  } else {
    el = document.createElement(options.tagName)
    if (options.className) {
      el.className = options.className
    }

    if (options.attributes) {
      for (a in options.attributes) {
        el.setAttribute(a, options.attributes[a])
      }
    }

    if (options.html !== undefined) {
      el.innerHTML = options.html
    }
  }

  if (options.text) {
    el.appendChild(document.createTextNode(options.text))
  }

  // IE 8 doesn"t have HTMLElement
  if (window.HTMLElement === undefined) {
    window.HTMLElement = Element
  }

  if (options.childs && options.childs.length) {
    for (i = 0; i < options.childs.length; i++) {
      el.appendChild(options.childs[i] instanceof window.HTMLElement ? options.childs[i] : createElement(options.childs[i]))
    }
  }

  return el
}

const load = function () {
  const cookiesFieldWrapper = document.querySelector("#wrap_Inputfield_cookies");
  if (cookiesFieldWrapper) {
    const cookiesField = document.querySelector("input#Inputfield_cookies");
    let cookies = (cookiesField.value) ? JSON.parse(cookiesField.value) : [
      {
        name: 'necessary',
        title: 'Necessary',
        cookies: ''
      },
      {
        name: 'functional',
        title: 'Functional',
        cookies: ''
      },
      {
        name: 'statistics',
        title: 'Statistics',
        cookies: ''
      },
      {
        name: 'marketing',
        title: 'Marketing',
        cookies: ''
      },
      {
        name: 'external_media',
        title: 'External Media',
        cookies: ''
      }
    ];
    console.log(cookies);

    cookiesFieldWrapper.after(createElement({
      tagName: "li",
      className: "Inputfield",
      attributes: {
        'id': 'wrap_Inputfield_cookies_custom'
      },
      childs: [
        {
          tagName: 'ul',
          className: 'priw-cookie-list'
        }
      ]
    }));
    let cookieList = document.querySelector(".priw-cookie-list");

    if (cookies) {
      cookies.forEach(function (el) {
        cookieList.append(createElement({
          tagName: "li",
          className: "cookie",
          attributes: {
            'data-name': el.name
          },
          childs: [
            {
              tagName: 'div',
              className: 'cookie-details',
              childs: [
                {
                  tagName: 'input',
                  className: 'cookie-name',
                  attributes: {
                    'id': 'cookie-name-' + el.name,
                    'value': el.name
                  }
                },
                {
                  tagName: 'input',
                  className: 'cookie-title',
                  attributes: {
                    'id': 'cookie-title-' + el.title,
                    'value': el.title
                  }
                }
              ]
            }
          ]
        }));
      });
      let sortable = Sortable.create(cookieList);
    }

  }
}

window.onload = load;
