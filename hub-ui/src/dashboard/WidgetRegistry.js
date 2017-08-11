import PlaceholderOneWidget from '../widgets/placeholder/components/PlaceholderWidget';
import PlaceholderTwoWidget from '../widgets/placeholdertwo/components/PlaceholderTwoWidget';
import QualityCenterQueryViewer from '../qualitycenter/components/QualityCenterQueryViewer';
import PingWidget from '../ping/components/PingWidget';

const RegisteredWidgets = {
  ping: PingWidget,
  placeholderOne: PlaceholderOneWidget,
  placeholderTwo: PlaceholderTwoWidget,
  qualityCenterQueryViewer: QualityCenterQueryViewer
};

export default RegisteredWidgets;