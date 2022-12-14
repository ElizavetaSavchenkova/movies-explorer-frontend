import InfoTooltip from '../InfoTooltip/InfoTooltip';
import '../InfoTooltip/InfoTooltip.css';

function InfoTooltipMovieDel({ isOpen, onClose, infoMessage }) {

  return (
    <InfoTooltip
      name={"movie-delete"}
      isOpen={isOpen}
      onClose={onClose}
      infoMessage={infoMessage}
    />
  )
}

export default InfoTooltipMovieDel;
