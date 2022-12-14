import InfoTooltip from '../InfoTooltip/InfoTooltip';
import '../InfoTooltip/InfoTooltip.css';

function InfoTooltipProfile({ isOpen, onClose, infoMessage }) {

  return (
    <InfoTooltip
      name={"movie-profile"}
      isOpen={isOpen}
      onClose={onClose}
      infoMessage={infoMessage}
    />
  )
}

export default InfoTooltipProfile;
