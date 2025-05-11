import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function NestedView() {

const {course} = useSelector((state)=> state.course);
const {token} = useSelector((state)=> state.auth);
const dispatch = useDispatch();

const [addSubSection,setAddSubSection] = useState(null);
const [viewSubsection,setViewSubSection] = useState(null);
const [EditSubSection,setEditSubSection] = useState(null);
const [confirmationModal,setConfirmationModal] = useState(null);


  return (
    <div>
      hello jee 
      NestedView mai aapka swagat hai.
    </div>
  )
}

export default NestedView
