var lang = {
  en: {
    // DO NOT EDIT!!!
    lang_name: "English",
    lang_unknown: "Unknown Language ('{lang}'), switched to default ('{default}')\n\nTo create your own language, edit the file named 'lang.js'",
    lang_missing: "[Missing Language]",
    lang_changed: "Changed to language '{name}'",
    lang_confirmChange: "Confirm language change to '{name}'",
    console_init: "-CONSOLE- for page '{page}'\nIf you are here, you must be pretty smart",
    console_loaded: "Page loaded in {time}s",
    console_unloaded: [
      "If the page hasn't loaded in {time} seconds, there is probably a bug",
      "For furthur information, press CTRL+SHIFT+I to open the terminal (for Chrome)",
      "To continue, press 'OK' (Use at own risk)"
    ].join("\n"),
    console_error: [
      "Ah no!",
      "An error has been detected!",
      "\nCreate an issue in the Github repo for help",
      "Check if the files have not been corrupted or changed",
      "The error message(s) should be here above or below this one",
      "\nError: {msg}",
      "On line {line}",
    ].join("\n"),
    console_new: [
      "Hello, you must be new.",
      "If you have any inquiries, click the footer in the bottom right to go to about.html",
      "Alternatively, you can create a new issue in the Github repo",
    ].join("\n"),
    console_browser: "It seems you are using {browser}, this site has not been tested on that browser, try Chrome at https://www.google.com/chrome",
    ls_confirmChange: "Confirm?",
    ls_import: "Import settings",
    ls_example: "{settings}",
    header_default: {
      text: "New Tab",
      title: "Click to edit text"
    },
    header_set: "Set header\n- " + [
      "Press ESC to exit"
    ].join("- "),
    header_title_index: "{title}",
    header_title_settings: "{title} Settings",
    header_title_about: "Custom Tab by Darcy",
    online_status: {
      text: "Unknown",
      title: "Click to update"
    },
    settings_btn: {
      text: "Settings",
      title: "Go to Settings"
    },
    footer: {
      text: "Designed and coded by "
    },
    footer_name: {
      text: "Darcy",
      title: "Your's Truly"
    },
    sc_button: {
      text: "Shortcut",
      title: "Shortcut"
    },
    sc_edit: {
      text: "",
      title: "Click to edit shortcut"
    },
    search_input: {
      "placeholder": "Search Google"
    },
    search_icon_search: {
      text: "",
      title: "Search Google"
    },
    search_icon_close: {
      text: "",
      title: "Clear Text"
    },
    sc_editPrompt_href: [
      "Change shortcut {num} ('{title}')",
      "- Set as blank to remove shortcut",
      "- Start with '*' to prevent formatting",
      "- Add '../' at the start to go back a folder (requires '*')",
      "- Click ESC to cancel"
    ].join("\n"),
    sc_editPrompt_text: [
      "Change title {num} ('{title}')",
      "- Click ESC to cancel"
    ].join("\n"),
    notes_default: "Notes",
    wip: {
      text: "Coming Soon!",
      title: "Wait until the next update...",
    },
    about_thanks: {
      text: "Thanks for using",
    },
    about_siteName: {
      text: "Custom Tab",
      title: "This site"
    },
    about_headerOther: {
      text: " by "
    },
    about_name: {
      text: "Darcy",
      title: "Your's Truly"
    },
    about_contact_header: {
      text: "Contact:"
    },
    about_contact_detail: {
      text: "If you have any problems or concerns, contact me here:"
    },
    about_contact_email_sf: {
      text: "Send Feedback"
    },
    about_contact_email_rb: {
      text: "Report a Bug"
    },
    about_contact_email_rf: {
      text: "Request feature"
    },
    about_setup_header: {
      text: "How to setup:"
    },
    about_setup_startup_header: {
      text: "How to open on startup:"
    },
    about_setup_tab_header: {
      text: "How to open on new tab:"
    },
    about_setup_chrome_title: {
      text: "Google Chrome"
    },
    about_setup_chrome_startup_body: {
      text: [
        "Click the \u22EE icon in the top-right corner.",
        "Click 'Settings' (Most likely 3rd from the bottom)",
        "Scroll down the bottom to 'On start-up'",
        "Select 'Open a specific page or set of pages'",
        "Click 'Add new page'",
        "Type the url you saved the site as",
        "(Something like '<i>C:/Users/name/Desktop/index.html</i> ')"
      ].join("<br>")
    },
    about_setup_chrome_tab_body: {
      text: [
        "Go to '<a href=\"https://chrome.google.com/webstore/detail/new-tab-redirect-plus/ijpbohlajcandnlillgbbafiofjfebji\">New Tab Redirect</a>' on the web store",
        "Click 'Add to Chrome'",
        "Press the > arrow 3 times until you see 'Set your Options'",
        "Click that link and type in the directory into the box",
        "(Something like '<em>file:///C:/Users/name/Desktop/index.html</em> ')",
        "Click 'Save' and that is it!"
      ].join("<br>")
    },
    about_setup_opera_title: {
      text: "Opera"
    },
    about_setup_opera_startup_body: {
      text: [
        "Click the <i class=\"fa fa-sliders\"></i> icon in the top-right corner.",
        "Scroll down to 'Go to full browser settings'",
        "Scroll down to 'On start-up'",
        "Select 'Open a specific page or set of pages'",
        "Click 'Add new page'",
        "Type the url you saved the site as",
        "(Something like '<i>C:/Users/name/Desktop/index.html</i> ')"
      ].join("<br>")
    },
    about_setup_opera_tab_body: {
      text: [
        "Go to '<a href=\"https://addons.opera.com/en/extensions/details/install-chrome-extensions/\">Install Chrome extensions</a>' on the addons website",
        "Go to '<a href=\"https://chrome.google.com/webstore/detail/new-tab-redirect-plus/ijpbohlajcandnlillgbbafiofjfebji\">New Tab Start Page</a>' on the Chrome web store",
        "Click 'Add to Opera'",
        "Right click on the extension and click 'Options'",
        "Type in the directory into the box",
        "(Something like '<em>file:///C:/Users/name/Desktop/index.html</em> ')",
        "Click 'Save' and that is it!"
      ].join("<br>")
    },
    about_setup_otherBrowser: {
      text: "Support for other browsers coming soon!",
    },
    about_about: {
      text: "About"
    },
    about_version: {
      text: "Version: "
    },
    about_changeLog_header: {
      text: "Changes:"
    },
    about_changeLog_body: {
      text: "- " + [
        "Added a message for new users",
        "Fixed back button not registering clicks",
        "Changed error messages to be more intuitive",
        "Other changes and fixes",
        "Added setup support for Opera browser",
        "Fixed bug where all data broke on complete reset, due to undefined language",
      ].join("<br>- ")
    },
    about_credits_header: {
      text: "Credits: "
    },
    about_credits_body: {
      text: [
        "<b>Darcy Burke</b> - Coded the site",
      ].join("")
    },
    back: {
      text: "Back",
    },
    settings_help: "Help",
    settings_help_header_p1: "Click a ",
    settings_help_header_p2: " icon for help",
    settings_help_missing: "Unknown",
    settings_header_general: "General",
    settings_general_newMessage: {
      text: "Send message for new users",
      desc: "Turn this off if you keep getting the new user message",
    },
    settings_general_error: {
      text: "Send error messages",
      desc: "Send help if there is an error in the program. Turn off if error messages get annoying",
    },
    settings_header_sc: "Shortcuts",
    settings_sc_dynamicFontSize: {
      text: "Dynamic Font Size",
      desc: "Changes the size of the text in the shortcuts based on how long the words are",
    },
    settings_sc_title: {
      text: "Show title",
      desc: "Show the chosen title of shortcuts",
    },
    settings_sc_favicon: {
      text: "Show site icon",
      desc: "Show the icon of a site",
    },
    settings_sc_newTab: {
      text: "Open shortcuts in new tab",
      desc: "When a shortcut is clicked, it will open in a new tab. Alternatively this can be done by dragging the shortcut into a new tab",
    },
    settings_sc_completeUrl: {
      text: "Complete URL - Shortcuts",
      desc: "Link is automatically formatted properly when written.<br>Example: 'youtube' to 'https://www.youtube.com/'.<br>Turn off if you are having issues. Otherwise, you can put '*' at the start of the link to prevent formatting",
    },
    settings_header_search: "Search",
    settings_search_barChangesSize: {
      text: "Search bar changes size",
      desc: "Search bar changes size when mouse is hovering over it or it is in focus",
    },
    settings_search_autofocus: {
      text: "Automaticallly focus on search bar",
      desc: "Cursor automatically focuses on search bar when page is loaded",
    },
    settings_search_clearOnLoad: {
      text: "Clear search bar on load",
      desc: "Search bar gets set to '' instead of keeping its content when page is loaded",
    },
    settings_search_completeUrl: {
      text: "Complete URL - Search",
      desc: "Link is automatically formatted properly when written.<br>Example: 'youtube' to 'https://www.youtube.com/'.<br>Still searches google.<br>Turn off if you are having issues. Otherwise, you can put '*' at the start of the link to prevent formatting",
    },
    settings_header_dateTime: "Date & Time",
    settings_dateTime_24Hour: {
      text: "24 Hour Time",
      desc: "Hours show up in 12 hour time if unticked",
    },
    settings_sc_test1: "title",
    settings_sc_test1_o1: "abc",
    settings_icon: {
      text: "",
      title: "Click for help"
    }
  },
  none: {},
  // Safe to edit
  haha: {
    // DO NOT EDIT!!!
    lang_name: "Weird",
    lang_unknown: "Ah! idk what '{lang}' is! i will change langauge to regular, which is '{default}'",
    lang_missing: "idk",
    lang_changed: "the language is now '{name}'",
    lang_confirmChange: "change language to '{name}'?? yeah??",
    console_init: "the",
    console_loaded: "it took {time} seconds for me to load the Page",
    console_unloaded: "By the gods! an error?!? ah well, pop open the console for more info.",
    console_error: "Ah no!\n An error has been detected!\n\nCreate a issue in the Github repo for help\n\nCheck if the files have not been corrupted or changed\n\nThe error message(s) should be here above or below this one\n\nError: {msg}\nOn line {line}",
    ls_confirmChange: "Yea??",
    ls_import: "Put the settings in",
    ls_example: "like this -> {settings}",
    header_default: {
      text: "it is new Tab",
      title: "lasagna tap to edit"
    },
    header_set: "The header   ",
    header_title_index: "IT IS!! {title}!!!",
    header_title_settings: "settins for {title}",
    header_title_about: "Custom Tab by Darcy",
    online_status: {
      text: "Ah idk",
      title: "Click to update it"
    },
    settings_btn: {
      text: "Settins :{|",
      title: "settings yeee"
    },
    footer: {
      text: "Made by the the "
    },
    footer_name: {
      text: "me",
      title: "it me "
    },
    sc_button: {
      text: "Shortbread",
      title: "clicc to go "
    },
    search_input: {
      placeholder: "Not bing :("
    },
    search_icon_search: {
      text: "",
      title: "Not bing :["
    },
    search_icon_close: {
      text: "",
      title: "Chuck it out"
    },
    sc_editPrompt_href: "change it now or else",
    sc_editPrompt_text: "change it now or else",
    notes_default: "h",
    workInProgress: {
      text: "not done yet",
    },
    about_thanks: {
      text: "thank you yes you",
    },
    about_siteName: {
      text: "for yousing This site",
      title: "This site"
    },
    about_headerOther: {
      text: " by "
    },
    about_name: {
      text: "me",
      title: "me yeahh"
    },
    about_contact_header: {
      text: "Contact:"
    },
    about_contact_detail: {
      text: "If you have any problems or concerns, contact me here:"
    },
    about_contact_email_sf: {
      text: "Send Feedback"
    },
    about_contact_email_rb: {
      text: "Report a Bug"
    },
    about_contact_email_rf: {
      text: "Request feature"
    },
    about_setup_header: {
      text: "How to setup:"
    },
    about_setup_startup_header: {
      text: "How to open on startup:"
    },
    about_setup_startup_body: {
      text: [
        "Click the \u22EE icon in the top-right corner.<br>",
        "Click 'Settings' (Most likely 3rd from the bottom)<br>",
        "Scroll down the bottom to 'On start-up'<br>",
        "Select 'Open a specific page or set of pages'<br>",
        "Click 'Add new page'<br>",
        "Type the url you saved the site as<br>",
        "(Something like '<i>C:/Users/name/Desktop/index.html</i> ')"
      ].join("")
    },
    about_setup_tab_header: {
      text: "How to open on new tab:"
    },
    about_setup_tab_body: {
      text: [
        "Go to '<a href=\"https://chrome.google.com/webstore/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna\">New Tab Redirect</a>' on the web store<br>",
        "Click 'Add to Chrome'<br>Press the > arrow 3 times until you see 'Set your Options'<br>",
        "Click that link and type in the directory into the box<br>",
        "(Something like '<i>file:///C:/Users/name/Desktop/index.html</i> ')<br>",
        "Click 'Save' and that is it!"
      ].join("")
    },
    about_setup_tab_footerNote: {
      text: "*This only works on "
    },
    about_setup_tab_footerNote_link: {
      text: "Google Chrome"
    },
    about_about: {
      text: "About"
    },
    about_version: {
      text: "Version: "
    },
    about_changeLog_header: {
      text: "Changes:"
    },
    about_changeLog_body: {
      text: [
        "- Made it",
      ].join("")
    },
    about_credits_header: {
      text: "Credits: "
    },
    about_credits_body: {
      text: [
        "<b>Darcy Burke</b> - Coded the site",
      ].join("")
    },
    back: {
      text: "Back",
    },
  },
  // Language example
  custom: {
    lang_name: "Custom Language!",
    console_init: "hello",
    lang_missing: "Text is not defined",
  }
}