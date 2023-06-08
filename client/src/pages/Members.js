/*import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_ME } from '../utils/queries';

const Members = () => {
    const { loading, data } = useQuery(GET_ME);

    const user = data?.getMe || {};

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div class="is-flex is-flex-wrap-wrap is-justify-content-center">
            <div class="header-card custom-header-card">
                <h4 id="members">Members</h4>
                <div class="row justify-content-center"> <div class="col-auto"></div>
                    <div class="members-list">
                        <div class="list1">
                            <table class="table">
                                <thead>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Emergency Contact Name</th>
                                    <th>Emergency Contact Number</th>
                                </thead>
                                <tbody id="memberDisplay">
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                    </tr>
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
*/