module.exports = {
  apps : [{
    name        : "API",
    script      : "index.js",
    instances   : 1,
    exec_mode   : "cluster",
    watch: ["./server", "./data"],
    ignore_watch : ["node_modules"],
    watch_options: {
      followSymlinks: false
    }
  }]
};
