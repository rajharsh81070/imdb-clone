import React from 'react';

export default function ActorList(props) {
  const { actors } = props;
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Actor Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Bio</th>
          </tr>
        </thead>
        <tbody>
          {actors.map((actor, index) => {
            return (
              <tr key={index}>
                {/* <td>
                  <Link to={"/course/" + course.slug}>{course.title}</Link>
                </td> */}
                <td>{actor.actor_name}</td>
                <td>Male</td>
                <td>
                  04/05/1998
                </td>
                <td>
                  Good.
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}
