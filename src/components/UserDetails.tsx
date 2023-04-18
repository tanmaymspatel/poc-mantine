import { useParams } from "react-router";

function UserDetails() {

    const { id } = useParams();

    return (
        <div>
            hi {id}
        </div>
    )
};

export default UserDetails;
