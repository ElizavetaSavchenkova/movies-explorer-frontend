import InfoTooltip from '../InfoTooltip/InfoTooltip';
import '../InfoTooltip/InfoTooltip.css';

function InfoTooltipMovie({ isOpen, onClose, infoMessage }) {

  return (
    <InfoTooltip
      name={"movie"}
      isOpen={isOpen}
      onClose={onClose}
      infoMessage={infoMessage}
    />
  )
}

export default InfoTooltipMovie;
