const helpers = {
  /**
   * Formats first + last and removes unwanted chars.
   * @TODO make this iterative to support middle names etc
   * @param {*} firstName e.g. "John"
   * @param {*} lastName e.g. "Doe"
   * @returns a full name string e.g. "John Doe"
   */
  formatName: (firstName = "", lastName = "") => {
    const fullName =
      helpers.capitalizeFirstLetter(firstName.toLowerCase().trim()) +
      " " +
      helpers.capitalizeFirstLetter(lastName.toLowerCase().trim());
    return fullName;
  },
  /**
   * Splits a full name into an array.
   * @param {*} name a full name e.g. "John Doe"
   * @returns an array with firstName and lastName e.g. ["John","Doe"]
   */
  splitName: (name = "") => {
    return name.split(" ");
  },
  capitalizeFirstLetter: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  /**
   * The SVG picture to use as profile photo.
   * Could have been an svg file but someone mutilated it into a base64 :(
   */
  profilePicSvgString:
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTE3cHgiIGhlaWdodD0iNTE3cHgiIHZpZXdCb3g9IjAgMCA1MTcgNTE3IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPmF2YXRhciBncmVlbjI8L3RpdGxlPgogICAgPGRlZnM+CiAgICAgICAgPHBhdGggZD0iTTAuOTczLDI1OC41NCBDMC45NzMsNDAwLjk4NyAxMTYuNDQ3LDUxNi40NjEgMjU4Ljg5Miw1MTYuNDYxIEwyNTguODkyLDUxNi40NjEgQzQwMS4zMzcsNTE2LjQ2MSA1MTYuODExLDQwMC45ODcgNTE2LjgxMSwyNTguNTQgTDUxNi44MTEsMjU4LjU0IEM1MTYuODExLDExNi4wOTUgNDAxLjMzNywwLjYyMSAyNTguODkyLDAuNjIxIEwyNTguODkyLDAuNjIxIEMxMTYuNDQ3LDAuNjIxIDAuOTczLDExNi4wOTUgMC45NzMsMjU4LjU0IiBpZD0icGF0aC0xIj48L3BhdGg+CiAgICA8L2RlZnM+CiAgICA8ZyBpZD0iL2F2YXRhci1ncmVlbjIiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnPgogICAgICAgICAgICA8cGF0aCBkPSJNNTE2LjgxMiwyNTguNTQwMyBDNTE2LjgxMiw0MDAuOTg1MyA0MDEuMzM4LDUxNi40NTkzIDI1OC44OTMsNTE2LjQ1OTMgQzExNi40NDcsNTE2LjQ1OTMgMC45NzMsNDAwLjk4NTMgMC45NzMsMjU4LjU0MDMgQzAuOTczLDExNi4wOTUzIDExNi40NDcsMC42MjEzIDI1OC44OTMsMC42MjEzIEM0MDEuMzM4LDAuNjIxMyA1MTYuODEyLDExNi4wOTUzIDUxNi44MTIsMjU4LjU0MDMiIGlkPSJGaWxsLTcxIiBmaWxsPSIjMDNGRjdGIj48L3BhdGg+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cC03NSI+CiAgICAgICAgICAgICAgICA8bWFzayBpZD0ibWFzay0yIiBmaWxsPSJ3aGl0ZSI+CiAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4KICAgICAgICAgICAgICAgIDwvbWFzaz4KICAgICAgICAgICAgICAgIDxnIGlkPSJDbGlwLTc0Ij48L2c+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNzQzLjA2NDksNjc3LjMwOTMgQzcyOC4xNTQ5LDU4MC45MjEzIDY5NS41ODQ5LDQ4OS45NDUzIDY0Ni43MTA5LDQwNS4zMDAzIEM2MzEuNTUyOSwzNzkuMDQ5MyA2MTQuMDE3OSwzNTQuMTcxMyA1OTkuOTc2OSwzMzIuMzk2MyBDNTU5LjczNjksMzcyLjczMzMgNTIxLjc2NTksNDEwLjc5NTMgNDgyLjc5NjksNDQ5Ljg1NzMgQzQ4Mi45NDQ5LDQ1MC4wOTMzIDQ4NS4yMDM5LDQ1My42NjQzIDQ4Ny40Mzk5LDQ1Ny4yNDkzIEM1NzcuODA2OSw2MDIuMTI4MyA2MTIuMTA5OSw3NTguNDEwMyA1NzguNzMzOSw5MjYuODM1MyBDNTQ2Ljg5NTksMTA4Ny40OTYzIDQ2Ni4zNzc5LDEyMTkuMjcyMyAzMzQuNzI3OSwxMzE3Ljg4MzMgQzMwMC44ODU5LDEzNDMuMjMxMyAyNjMuNzMzOSwxMzY0LjE1NzMgMjI4LjEwMTksMTM4Ny4xMTUzIEMyMjQuMDI0OSwxMzg4LjI0ODMgMjE5LjczMjksMTM4OC44OTMzIDIxNS45MDM5LDEzOTAuNTg1MyBDMTE0LjEwMjksMTQzNS41NjUzIDguNTYzOSwxNDU1LjcwNzMgLTEwMy4yOTQxLDE0NDYuMTc4MyBDLTE3My4wMDAxLDE0NDAuMjM5MyAtMjM5Ljg3NTEsMTQyNS43NTAzIC0zMDMuNjY0MSwxMzk4LjIyNjMgQy00NDEuMTU2MSwxMzM4LjkwMTMgLTU0Ni43OTUxLDEyNDMuNjY1MyAtNjE4LjI4NzEsMTExMS43OTQzIEMtNjYxLjg4MzEsMTAzMS4zNzgzIC02ODUuNDYyMSw5NDUuNTIyMyAtNjkzLjYzOTEsODUzLjc5NDMgQy02OTguMjU3MSw4MDIuMDE0MyAtNjkxLjY0MTEsNzUyLjQ1ODMgLTY4Ni40MDQxLDcwMi4wMjEzIEMtNjgwLjk2OTEsNjQ5LjY3OTMgLTY2MS41NjgxLDYwMS4xMzUzIC02NDYuMTQxMSw1NTEuNTAwMyBDLTY0Mi4yOTAxLDU0NS4yMDczIC02MzcuODUwMSw1MzkuMTk3MyAtNjM0LjY3NjEsNTMyLjU4MDMgQy01OTIuMjE1MSw0NDQuMDYxMyAtNTMzLjkyMDEsMzY4LjI2ODMgLTQ1Ny4xNDQxLDMwNi40NTgzIEMtMzQyLjA5NTEsMjEzLjgzNTMgLTIxMC4xODUxLDE2Ny4xMDkzIC02My42MzkxLDE2MS45OTgzIEMyMi4yNzM5LDE1OS4wMDIzIDEwNC45OTY5LDE3OC4zODgzIDE4NS4zMTU5LDIwNy45ODczIEMxOTUuNzE0OSwyMTEuODE5MyAyMDUuMjA3OSwyMTguMTEyMyAyMTIuODM3OSwyMjIuMDc4MyBDMTcxLjE4MzksMjYzLjc4MzMgMTMxLjY0NTksMzAzLjM3MDMgOTAuOTYzOSwzNDQuMTAxMyBDLTIxOS4xNzAxLDI1Ni42NjczIC00NzIuNzgzMSw0NjAuNDE0MyAtNTI0LjIxMzEsNjk3LjMzOTMgQy01MzkuMTQ2MSw3NjEuMTMxMyAtNTQxLjY1MjEsODI1LjcyMTMgLTUyOS43OTYxLDg4OS44NDczIEMtNTA3Ljc0OTEsMTAwOS4wODAzIC00NTAuOTUwMSwxMTA4LjEyNjMgLTM1NS4yNjIxLDExODQuODQ1MyBDLTI2OS43NzIxLDEyNTMuMzg4MyAtMTcxLjkwMDEsMTI4Ni42ODQzIC02NC4xMDMxLDEyOTAuMTU1MyBDLTI0LjM2MTEsMTI5MS40MzQzIDE1LjcxODksMTI4Mi4xODkzIDU1LjY0MzksMTI3Ny43NDUzIEMzNDguNzcyOSwxMjE1LjMwNDMgNDcyLjk1MjksOTA4Ljc0MzMgNDE5LjQ4MzksNzMwLjUwMzMgTDM2LjA0NDksNzMwLjUwMzMgQy0xNC4wNjUxLDc3Mi4yMTQzIC0xMDYuOTg0MSw4NjguNTEwMyAtMTE2LjczMjEsODg5LjUzMDMgQy04NS4xMjMxLDg4OS41MzAzIC01NC4zOTIxLDg4OS41MzEzIC0yMy42NjMxLDg4OS41MzAzIEM3LjE4MDksODg5LjUyOTMgMzguMDIzOSw4ODkuNTI4MyA2OC44NjY5LDg4OS41MjYzIEM5OS43MDk5LDg4OS41MjUzIDEzMC41NjA5LDg4OS4wNzYzIDE2MS4zOTM5LDg4OS42NTEzIEMxOTEuNTc3OSw4OTAuMjE1MyAyMjIuMDg0OSw4ODcuMDA2MyAyNTMuNzI1OSw4OTIuMTA5MyBDMjUyLjY1NzksOTAxLjE3OTMgMjUyLjkyNzksOTA2LjU3NzMgMjUxLjMyNTksOTExLjM0NjMgQzIwOS44Mzg5LDEwMzQuOTAzMyA4My4yMzM5LDExMzAuMzg0MyAtNDIuOTYyMSwxMTI2LjI1MzMgQy02MS4wMTYxLDExMjUuNjYyMyAtNzkuMTEwMSwxMTI2LjI3NjMgLTk3LjE4NTEsMTEyNi4zMzEzIEMtMjU1LjEyMTEsMTEwMC44NzEzIC0zNTcuOTY5MSw5NzkuNzY1MyAtMzcyLjgyODEsODM3Ljc3NzMgQy0zNzIuMjkyMSw3OTguNTU5MyAtMzczLjU1NzEsNzU5LjM1MzMgLTM2MS45NDQxLDcyMC45NjczIEMtMzMyLjc4MzEsNjI0LjU4NDMgLTI3Mi40OTIxLDU1NS45NjQzIC0xODAuNTM5MSw1MTUuNDExMyBDLTk0LjA3NTEsNDc3LjI3OTMgLTcuNTU2MSw0NzkuMTc5MyA3OC40MDQ5LDUxNy4zNDUzIEM5NS43MTc5LDUyNS4wMzMzIDExMi40MDQ5LDUzNC4xMzQzIDEzMC44OTk5LDU0My4zMzkzIEMyNDYuMTU5OSw0MjguMDc0MyAzNjAuNjgzOSwzMTMuNTgzMyA0NzUuODU1OSwxOTguMjk0MyBDNDI2LjQ3OTksMTU1LjYxMDMgMzc2LjkyMjksMTIxLjQyNDMgMzIyLjk4NDksOTMuMTkzMyBDMjM0LjUxMzksNDYuODkwMyAxNDEuMjU1OSwxOC4wNjUzIDQxLjgxODksNi41MzQzIEMtMzIuNjQ5MSwtMi4xMDI3IC0xMDYuNzIxMSwtMS41MzY3IC0xODAuMTgzMSw5LjkzOTMgQy0zMDIuNjM3MSwyOS4wNjgzIC00MTQuOTc1MSw3NS4wNzMzIC01MTYuNDI0MSwxNDYuODI3MyBDLTYyNy44MzcxLDIyNS42MjgzIC03MTUuMDQzMSwzMjUuMDkzMyAtNzc0LjEwNjEsNDQ4LjU5MzMgQy04NTMuODQxMSw2MDIuMjMxMyAtODczLjQ0NTEsNzY1LjczNDMgLTg0OC43MjYxLDkzNC43ODgzIEMtODMwLjkzNzEsMTA1Ni40NDgzIC03ODMuODY3MSwxMTY3LjYxMjMgLTcxMy4xMDAxLDEyNjguNTM1MyBDLTYzOC40NzYxLDEzNzQuOTU5MyAtNTQzLjgxNTEsMTQ1OC40MjczIC00MjguODAwMSwxNTE4Ljk2OTMgQy0zNDAuNDE4MSwxNTY1LjQ5MjMgLTI0Ny4xODQxLDE1OTQuODI4MyAtMTQ3LjQ4NDEsMTYwNS44NjMzIEMtNzEuODczMSwxNjE0LjIzMjMgMy4xNTY5LDE2MTMuMzQ1MyA3Ny44NTI5LDE2MDEuNzE5MyBDMTY5LjkwNzksMTU4Ny4zOTAzIDI1Ny4wOTU5LDE1NTguMDc3MyAzMzYuNTExOSwxNTA4LjA3ODMgQzM0NC4zNTc5LDE1MDUuMTcyMyAzNTIuOTQ4OSwxNTAzLjQ3ODMgMzU5LjkzNTksMTQ5OS4xNzgzIEM0NTguOTA3OSwxNDM4LjI2MzMgNTQzLjU2MTksMTM2Mi4wMjQzIDYwOS40MTg5LDEyNjUuNjE1MyBDNjg1LjE0MzksMTE1NC43NTkzIDczMi4wMjA5LDEwMzMuNTkzMyA3NDYuOTg0OSw4OTkuNTIzMyBDNzU1LjMwODksODI0LjkzNDMgNzU0LjQ0MzksNzUwLjg2MzMgNzQzLjA2NDksNjc3LjMwOTMiIGlkPSJGaWxsLTczIiBmaWxsPSIjNjA5RjU2IiBtYXNrPSJ1cmwoI21hc2stMikiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
};

export default helpers;
