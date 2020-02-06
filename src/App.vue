<template>
  <div id="app">
    <h1>Tabby</h1>

    <router-view />
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: sans-serif;
  color: #555;
}

#app {
  width: 20em;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin: 0;
  font-size: 1.6em;
  padding: 0.4em 0.2em;
  border-bottom: 1px solid #eee;
}
</style>
