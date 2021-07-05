import './ProgressBar.scss';

const ProgressBar = ({ percentage }) => {
  return (
    <div class="meter">
      <span style={{ width: percentage }}><span></span></span>
    </div>
  )
}

ProgressBar.defaultProps = {
  percentage: '50%'
}

export default ProgressBar;

