import React from 'react';
import { useQuery } from '@apollo/client';
import '../assets/styles/Members.css';

import { GET_MEMBERS } from '../utils/queries';

const Members = () => {
    const { loading, data } = useQuery(GET_MEMBERS);

    const members = data?.getMembers || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="members-body is-flex is-flex-wrap-wrap is-justify-content-center">
            <div className="header-card custom-header-card">
                <h4 className="members">Members</h4>
                <div className="row justify-content-center">

                    <div className="members-list">
                        <div className="table-wrapper">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Emergency Contact Name</th>
                                        <th>Emergency Contact Number</th>
                                    </tr>
                                </thead>
                                <tbody className="memberDisplay">
                                    {members &&
                                        members.map((member, index) => (
                                            <tr key={member._id || index}>
                                                <td>{member.name}</td>
                                                <td>{member.email}</td>
                                                <td>{member.phone}</td>
                                                <td>{member.emergencyContactName}</td>
                                                <td>{member.emergencyContactNumber}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Members;
