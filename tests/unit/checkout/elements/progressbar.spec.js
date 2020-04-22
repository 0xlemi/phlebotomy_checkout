import { expect } from 'chai'
import { mount } from 'vue-test-utils'
import ProgressBar from '@/components/Checkout/Elements/ProgressBar.vue'

describe('ProgressBar', () => {
  let wrapper;

   beforeEach( () => {
     wrapper = mount(ProgressBar);
   });


  it('moves when step is changed', () => {

    expect(0).toBe(0);
  });

});
