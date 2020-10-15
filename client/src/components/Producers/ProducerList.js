import React from 'react';

export default function ProducerList(props) {
  const { producers } = props;
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Producer Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Bio</th>
          </tr>
        </thead>
        <tbody>
          {producers.map((producer, index) => {
            return (
              <tr key={index}>
                {/* <td>
                  <Link to={"/course/" + course.slug}>{course.title}</Link>
                </td> */}
                <td>{producer.producer_name}</td>
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
