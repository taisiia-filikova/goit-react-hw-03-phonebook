import PropTypes from 'prop-types';
import s from './ContactFilter.module.css';

function ContactFilter({ value, onChange }) {
  return (
    <label className={s.label}>
      Find person
      <input
        className={s.input}
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Enter something"
      />
    </label>
  );
}

ContactFilter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ContactFilter;
