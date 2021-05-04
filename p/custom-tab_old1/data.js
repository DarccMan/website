var data = {
  default: {
    // Do not edit
    settings: {
      general_newMessage: true,
      general_error: true,
      sc_dynamicFontSize: true,
      sc_title: true,
      sc_favicon: true,
      sc_newTab: false,
      sc_completeUrl: true,
      search_barChangesSize: true,
      search_autofocus: true,
      search_clearOnLoad: true,
      sc_completeUrl: true,
      // dateTime_swapMonth: false,
      dateTime_24Hour: false,
      // dateTime_classicCalendar: false,
      // dynColor_all: false,
      // dynColor_bg: false,
      // dynColor_notes: false,
      // dynColor_calendar: false,
      // dynColor_email: false,
      // dynColor_search: false,
      // dynColor_nightLight: false,
      // bgImg_togglePos: true
    },
    // bg: {
    //   type: "color",
    //   image: null,
    //   color: null,
    //   url: null,
    //   style: {}
    // },
    notes: {},
    header: null,
    sc: {},
    // emails: {},
    lang: null,
    firstTime: true,
    cLang: "en",
  },
  sc: {
    // Safe to edit
    amount: 18,
    row_amount: 6,
    default_href: "https://www.google.com/",
    extensions: {
      start_file: ["file:", "file"],
      end_file: ["html", "png", "txt", "jpeg", "gif", "js", "css", "wav", "mp3", "mp4", "m4a", "bruh", "less", "flac", "exe", "vbs", "piss", "gloop"],
      start_www: ["www"],
      start_link: ["https:", "http:", "https", "http"],
      end_link: ["com", "net", "org", "gov", "au", "us", "online", "link", "io", "piss", "edu", "uk", "vic", "gunk", "xyz", "co", "nz", "ck", "www", "pk", "tech", "uae", "*"]
    },
    // Safe to edit
    maxTextLength: 15,
    maxFontSize: 36,
    undefined_color: "rgba(130, 130, 130)",
    bug_timeout: 1000
  },
  // Safe to edit
  header: {
    max_length: 30
  },
  notes: {
    // Safe to edit
    notes: [
      // Copy and paste the below lines for more notepads
      {
        color: "rgba(250, 240, 100)",
        text: "Notes",
        style: "margin-top:-50px;"
      },
      /* {
        color: "rgba(20, 240, 100)",
        text: "Notes",
        style: "margin-top:-50px;"
      } */
    ],
    border_colorChange: 30
  },
  bug_timeout: 500,
  def_lang: "en",
  // Do not edit
  pages: {
    sc: ["index"],
    notes: ["index"],
    online: ["index"],
    dateTime: ["index"],
  },
  version: "2.2",
  // Definitely DO NOT EDIT
  lsName: "customtab.all",
  settings: {
    wip_color: "rgba(130, 130, 130)",
    // Add settings groups here
    groups: [
      {
        id: "general",
        items: [
          {
            id: "newMessage",
            type: "checkbox",
          },
          {
            id: "error",
            type: "checkbox",
          },
        ]
      },
      {
        id: "sc",
        items: [
          // Add settings items here
          {
            id: "dynamicFontSize",
            type: "checkbox",
          },
          {
            id: "title",
            type: "checkbox",
          },
          {
            id: "favicon",
            type: "checkbox",
            disabled: true,
            checked: false,
            wip: true,
          },
          {
            id: "newTab",
            type: "checkbox",
          },
          {
            id: "completeUrl",
            type: "checkbox",
          },
          {
            id: "test1",
            type: "select",
            options: [
              {
                value: "o1",
                selected: true,
              },
              {
                value: "o2",
              },
            ]
          },
        ]
      },
      {
        id: "search",
        items: [
          // Add settings items here
          {
            id: "barChangesSize",
            type: "checkbox"
          },
          {
            id: "autofocus",
            type: "checkbox"
          },
          {
            id: "clearOnLoad",
            type: "checkbox"
          },
          {
            id: "completeUrl",
            type: "checkbox",
          },
        ]
      },
      {
        id: "dateTime",
        items: [
          // Add settings items here
          {
            id: "24Hour",
            type: "checkbox"
          },
        ]
      },
    ]
  },
  clock: {
    refresh: 10,
  },
}