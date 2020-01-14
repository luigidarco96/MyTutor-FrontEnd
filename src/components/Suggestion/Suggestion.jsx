import React from 'react'
import '../../assets/css/suggestions.css'


const Suggestions = (props) => {
  const getDetailNotice = e => {
    let { pathname } = props;
    props.history.push('detailNotices/' + e.protocol);
  };

  const options = props.results.map(r => (
    <li className='list-suggestions-item' onClick={() => getDetailNotice(r)}>
      {r.protocol}
    </li>
  ))
  return <ul className='list-suggestions'>{options}</ul>
}

export default Suggestions