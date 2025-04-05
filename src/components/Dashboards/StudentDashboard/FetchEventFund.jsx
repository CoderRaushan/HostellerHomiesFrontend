import React from 'react'
import ForComponent from '../components/forComponent';
import Progress from '../components/Progress';
const About = () => {
     const[event , setEvent] = useState('');
      const [status, setStatus] = useState(['']);
  
      useEffect(() => {
          const fetchData = async () => {
              try {
                  const res = await fetch('http://localhost:3000/api/Event/EventFund/student/get');
                  const data = await res.json();
                  console.log(data);
              } catch (error) {
                  console.error('Error fetching data:', error);
              }
          };
          fetchData();
          setEvent(fetchData);
          setStatus(event.status , event.eventDetails.eventDetails);
          
      }, []);
  return (
    <div>
      <Progress currentStatus={status} />
    </div>
  )
}

export default About;