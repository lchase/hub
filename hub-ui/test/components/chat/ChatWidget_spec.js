import { renderComponent, expect } from '../../TestHelper';
import ChatWidget from '../../../src/components/chat/ChatWidget';

describe('ChatWidget', () => {


  it('shows text contained within the widget', () => {
    const component = renderComponent(ChatWidget);
    expect(component).to.contain('Mike Doe');
  });

});