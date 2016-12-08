import { voteService } from 'services';

const fetchData = () => {
  return voteService.getResources()
          .then(res => res.data);
};

export default fetchData;

