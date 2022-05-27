export const themeData = {
  "navbar": [
    {
      "text": "Home",
      "link": "/"
    },
    {
      "text": "Guide",
      "link": "/guide/"
    },
    {
      "text": "emoji",
      "link": "/emoji/"
    },
    {
      "text": "External",
      "link": "https://google.com"
    },
    {
      "text": "Languages",
      "ariaLabel": "Language Menu",
      "children": [
        {
          "text": "Chinese",
          "link": "/language/chinese/"
        },
        {
          "text": "Japanese",
          "link": "/language/japanese/"
        }
      ]
    }
  ],
  "repoLabel": "GitHub",
  "editLinks": true,
  "editLinkText": "编辑此页面",
  "sidebar": {
    "/guide/": [
      {
        "text": "guide",
        "title": "guide",
        "collapsable": false,
        "sidebarDepth": 1,
        "children": [
          "README.md",
          "add.md",
          "function.md"
        ]
      }
    ],
    "/emoji/": [
      {
        "text": "emoji",
        "title": "emoji",
        "collapsable": false,
        "sidebarDepth": 1,
        "children": [
          "README.md",
          "em.md"
        ]
      }
    ]
  },
  "locales": {
    "/": {
      "selectLanguageName": "English"
    }
  },
  "logo": null,
  "darkMode": true,
  "repo": null,
  "selectLanguageText": "Languages",
  "selectLanguageAriaLabel": "Select language",
  "sidebarDepth": 2,
  "editLink": true,
  "lastUpdated": true,
  "lastUpdatedText": "Last Updated",
  "contributors": true,
  "contributorsText": "Contributors",
  "notFound": [
    "There's nothing here.",
    "How did we get here?",
    "That's a Four-Oh-Four.",
    "Looks like we've got some broken links."
  ],
  "backToHome": "Take me home",
  "openInNewWindow": "open in new window",
  "toggleDarkMode": "toggle dark mode",
  "toggleSidebar": "toggle sidebar"
}
