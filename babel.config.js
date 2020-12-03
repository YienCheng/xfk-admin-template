module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        polyfills: [
          'es.array.iterator',
          'es.promise',
          'es.object.assign',
          'es.promise.finally',
          'es.promise.all-settled'
        ]
      }
    ]
  ]
};
