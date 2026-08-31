/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FDF3E0",
        paper: "#FFFBF2",
        ink: "#26201A",
        coral: "#FF5A38",
        coralText: "#A73520",
        sun: "#FFB930",
        jade: "#2FA88C",
        jadeText: "#146B59",
        plum: "#7C5CFF",
        plumText: "#5032A7",
        seal: "#CE2B18",
      },
      boxShadow: {
        hard: "4px 4px 0 #26201A",
        hardsm: "3px 3px 0 #26201A",
        hardlg: "8px 8px 0 #26201A",
      },
      fontFamily: {
        sans: [
          '"PingFang SC"',
          '"HarmonyOS Sans SC"',
          "MiSans",
          '"Microsoft YaHei"',
          "system-ui",
          "sans-serif",
        ],
        kai: ['"Kaiti SC"', "STKaiti", "KaiTi", "serif"],
        editorial: ['"Songti SC"', "STSong", "SimSun", "serif"],
      },
    },
  },
  plugins: [],
};
