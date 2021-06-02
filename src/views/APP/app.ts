import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';
@Component
export default class APP extends Vue {
   private transitionName: string = 'slide-right';

@Watch('$route')
 private onChangeValue(newVal: string, oldVal: string) {
   console.log('new:', newVal);
   console.log('oldVal:', oldVal);
}
}
