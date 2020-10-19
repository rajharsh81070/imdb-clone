import React from 'react';
import Table from 'react-bootstrap/Table';

export default function ActorList(props) {
  const { actors } = props;
  return (
    <div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Actor Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Bio</th>
          </tr>
        </thead>
        <tbody>
          {props.actors.length > 0 ?
            actors.map((actor, index) => {
              return (
                <tr key={index}>
                  {/* <td>
                  <Link to={"/course/" + course.slug}>{course.title}</Link>
                </td> */}
                  <td>{actor.actor_name}</td>
                  <td>{actor.actor_gender}</td>
                  <td>
                    {actor.actor_dob.split('T')[0]}
                  </td>
                  <td>
                    {actor.actor_bio}
                  </td>
                </tr>
              );
            })
            : <h4>No Actors</h4>
          }
        </tbody>
      </Table>
    </div>
  )
}
