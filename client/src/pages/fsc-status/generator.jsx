import _ from 'lodash';

const generator = (heartbeat, batch) => {
  const payload = [];

  _.forEach(heartbeat, beat => {
    const node = _.find(batch, ['node_id', beat.node_id]);

    payload.push({
      id: beat.node_id,
      heartBeat: beat.heartbeat_time,
      errorCount: node.batch_in_error_count,
      sendCount: node.batch_to_send_count,
    });
  });

  return payload;
};

export default generator;
