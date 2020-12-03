import SvgIcon from '@/components/SvgIcon';

const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext) => requireContext.keys().map(requireContext);

export default {
  install(Vue) {
    // register global svg icon
    Vue.component('svg-icon', SvgIcon);
    // load all svg icon from @icon/svg
    requireAll(req);
  }
};
