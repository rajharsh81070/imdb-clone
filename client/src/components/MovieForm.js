import React from 'react';

export default function MovieForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <br />
        <label htmlFor="movie_name">Movie Name</label>
        <div className="field">
          <input
            type="text"
            name="movie_name"
            className="form-control"
            onChange={props.onChange}
            value={props.data.movie_name}
            required
          />
        </div>
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="actor">Actor</label>
        <div className="field">
          <input
            type="text"
            name="actor_id"
            className="form-control"
            onChange={props.onChange}
            value={props.data.actor_id}
            required
          />
        </div>
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="producer">Producer</label>
        <div className="field">
          <input
            type="text"
            name="producer_id"
            className="form-control"
            onChange={props.onChange}
            value={props.data.producer_id}
            required
          />
        </div>
      </div>

      <input type="submit" value="Save" className="btn btn-primary" />
    </form >
  )
}
