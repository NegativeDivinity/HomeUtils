import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background-color: rgb(73, 73, 77);
    color: white;
    width: 40%;
    margin: 2% 0 0 30%;
    text-align: center;

    div {
        display: flex;
        justify-content: space-between;
        width: 70%;
        margin: 0 0 1% 15%;

        p {
            font-size: 20px;
        }
    }
`;

export default function UserBioView() {

    const {id} = useParams()

    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsUser(id))
    }, [dispatch, id])


    const bdayFormat = (bday) => {
        return bday.substring(0, bday.indexOf('T'));
    }

    return (
       <PageWrapper>
           {loading ? (
               <LoadingBox />
           ) : error ? (
               <MessageBox>{error}</MessageBox>
           ) : (
               <>
                   <h1>{user.firstName} {user.lastName}</h1>
                   <div>
                       <p>Username: </p>
                       <p>{user.userName}</p>
                   </div>
                   <div>
                       <p>Email: </p>
                       <p>{user.email}</p>
                   </div>
                   <div>
                       <p>Company: </p>
                       <p>{user.company}</p>
                   </div>
                   <div>
                       <p>Job Title: </p>
                       <p>{user.jobTitle}</p>
                   </div>
                   <div>
                       <p>Birthday: </p>
                       <p>{bdayFormat(user.birthday)}</p>
                   </div>
                   <div>
                       <p>Medical Warning: </p>
                       <p>{user.medicalWarning}</p>
                   </div>
                   <div>
                       <p>Favor Movie: </p>
                       <p>{user.favMovie}</p>
                   </div>
                   <div>
                       <p>Favorite Song: </p>
                       <p>{user.favSong}</p>
                   </div>
               </>
           )}
       </PageWrapper>
    )
}