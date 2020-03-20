import {debounce} from "./utils";
import BackTop from "../components/common/backtop/BackTop";
export const itemListenerMixin = {
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImageListener = ()=>{
      refresh();
    }
    this.$bus.$on('imageLoad',this.itemImageListener)
  },
  data(){
    return {
      itemImageListener:null
    }
  }
}
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      backTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0,300)
    },
  }
}
