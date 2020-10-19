import React from 'react';
import Table from 'react-bootstrap/Table';

export default function ProducerList(props) {
  const { producers } = props;
  return (
    <div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Producer Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Bio</th>
          </tr>
        </thead>
        <tbody>
          {
            props.producers.length > 0 ?
              producers.map((producer, index) => {
                return (
                  <tr key={index}>
                    <td>{producer.producer_name}</td>
                    <td>{producer.producer_gender}</td>
                    <td>
                      {producer.producer_dob.split('T')[0]}
                    </td>
                    <td>
                      {producer.producer_bio}
                    </td>
                  </tr>
                );
              })
              : <h4>No Producers</h4>
          }
        </tbody>
      </Table>
    </div>
  )
}
