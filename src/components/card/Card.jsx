import PropTypes from "prop-types";

export default function Card({ task }) {
  return (
    <div className="card">
      <p>{task.title}</p>
    </div>
  );
}

Card.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};
