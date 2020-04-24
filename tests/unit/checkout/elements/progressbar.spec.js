import { shallowMount } from '@vue/test-utils'
import ProgressBar from '@/components/Checkout/Elements/ProgressBar.vue'

let wrapper;

beforeEach( () => {

});

afterEach( () => {
  wrapper.destroy();
});

describe('ProgressBar.vue', () => {

  // Test the hole thing

  test('text corresponds to the correct steps', () => {
    wrapper = shallowMount(ProgressBar, {
       propsData: {
         step: 2,
         numberSteps: 6
       }
     });

    expect(wrapper.text()).toMatch('Step 2/6');
  });

  test('text and bar is red when not complete', () => {
    wrapper = shallowMount(ProgressBar, {
      propsData: {
         step: 2,
         numberSteps: 9
       }
    });

    let span = wrapper.find('span').classes();
    expect(span).toContain('text-red-800');
    expect(span).toContain('bg-red-200');

    let bar = wrapper.find({ ref: 'progressbar-bar'});
    expect(bar.classes()).toContain('bg-red-400');
  });


  test('text and bar becomes green when complete', () => {
    wrapper = shallowMount(ProgressBar, {
       propsData: {
         step: 7,
         numberSteps: 6
       }
     });

    expect(wrapper.text()).toMatch('Complete');

    let span = wrapper.find('span').classes();
    expect(span).toContain('text-green-800');
    expect(span).toContain('bg-green-200');

    let bar = wrapper.find({ ref: 'progressbar-bar'});
    expect(bar.classes()).toContain('bg-green-400');
  });

  test('bar moves on the persentage of the progress on 20%', () => {
    wrapper = shallowMount(ProgressBar, {
       propsData: {
         step: 1,
         numberSteps: 4
       }
     });


    let bar = wrapper.find({ ref: 'progressbar-bar'});
    expect(bar.attributes('style')).toMatch('width: 20%');

  });

  test('bar moves on the persentage of the progress on last step', () => {
    wrapper = shallowMount(ProgressBar, {
       propsData: {
         step: 4,
         numberSteps: 4
       }
     });


    let bar = wrapper.find({ ref: 'progressbar-bar'});
    expect(bar.attributes('style')).toMatch('width: 80%');

  });


});
