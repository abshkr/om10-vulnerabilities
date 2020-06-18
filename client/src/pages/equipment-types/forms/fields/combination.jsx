import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Badge, Divider, Modal, Input, Tag, Tooltip, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import _ from 'lodash';

import { Equipment, DataTable } from '../../../../components';
import { EQUIPMENT_TYPES } from '../../../../api';
import { search } from '../../../../utils';
import axios from 'axios';

const getRandomNumbers = () => {
  const typedArray = new Uint8Array(5);
  const randomValues = window.crypto.getRandomValues(typedArray);
  return randomValues.join('');
};

const generator = (data) => {
  const payload = [];

  _.forEach(data, (el) => {
    const random = getRandomNumbers();

    const val = {
      ...el,
      id: `${el?.etyp_id}-${random}`,
    };

    payload.push(val);
  });

  return payload;
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);

  if (result[startIndex]?.image === 'P' || result[endIndex]?.image === 'P') {
    return Array.from(list);
  }

  const [removed] = result.splice(startIndex, 1);

  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const result = {};

  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  const dropIndex = removed?.image === 'P' ? 0 : droppableDestination.index;

  destClone.splice(dropIndex, 0, removed);

  result[droppableSource.droppableId] = generator(Array.from(source));
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getListStyle = (isDraggingOver, ind) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  overflowX: 'scroll',
  marginBottom: 20,
  border: '1px solid #d9d9d9',
  background:
    ind === 0
      ? 'white'
      : `radial-gradient(circle, transparent 20%, slategray 20%, slategray 80%, transparent 80%, transparent),
      radial-gradient(circle, transparent 20%, slategray 20%, slategray 80%, transparent 80%, transparent) 50px 50px,
      linear-gradient(#A8B1BB 8px, transparent 8px) 0 -4px,
      linear-gradient(90deg, #A8B1BB 8px, transparent 8px) -4px 0`,
  backgroundSize: ind === 0 ? null : '100px 100px, 100px 100px, 50px 50px, 50px 50px',
  backgroundColor: ind === 0 ? 'white' : 'slategray',
  borderRadius: 5,
  width: '100%',
  height: 125,
});

const Combination = ({ form }) => {
  const { t } = useTranslation();

  const { data: payload } = useSWR(EQUIPMENT_TYPES.READ);

  const [state, setState] = useState([[], []]);

  const { setFieldsValue } = form;

  const onDragEnd = (result) => {
    const { source, destination } = result;

    const sourceElement = state[0]?.[source.index];
    const firstDesinationElement = state[1]?.[0];

    if (!destination || (source?.droppableId === '1' && destination?.droppableId === '0')) {
      return;
    }

    if (sourceElement?.image === 'P' && firstDesinationElement?.image === 'P') {
      return;
    }

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];

      newState[sInd] = items;

      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];

      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter((group) => group.length));
    }
  };

  const onRemove = (index) => {
    const newResults = [...state[1]];

    newResults.splice(index, 1);

    setState([state[0], newResults]);
  };

  const onSearch = (value) => {
    const data = generator(payload?.records);

    const results = search(value, data);

    setState([results, state[1]]);
  };

  const onShowCompartments = async (item, index) => {
    const equipment = await axios.get(EQUIPMENT_TYPES.COMPOSITION, {
      params: {
        etyp_id: item.etyp_id,
      },
    });

    const equipments = equipment?.data?.records[index];

    console.log("onShowCompartments", index, item, equipment?.data?.records, equipments);

    const columns = [
      {
        headerName: t('fields.compartment'),
        field: 'cmpt_no',
        sortable: true,
        resizable: true,
      },
      {
        headerName: t('fields.capacity'),
        field: 'cmpt_capacit',
        sortable: true,
        resizable: true,
      },
      {
        headerName: t('fields.unit'),
        field: 'cmpt_units',
        sortable: true,
        resizable: true,
      },
    ];

    Modal.info({
      title: `${item.etyp_title} - ${equipments?.etyp_title}`,
      width: '30vw',
      content: (
        <div style={{ marginBottom: 10 }}>
          <DataTable data={equipments?.compartments || []} columns={columns} minimal height='70vh' />
        </div>
      ),
    });
  };

  const getCompartmentNumber = (item, index) => {
    const cmptList = item?.cmpts?.split(',');

    if (index < cmptList.length) {
      return cmptList[index];
    } else {
      return 0;
    }
  };

  // adhoc retriving
  const getCompartmentNumber2 = async (item, index) => {
    const equipment = await axios.get(EQUIPMENT_TYPES.COMPOSITION, {
      params: {
        etyp_id: item.etyp_id,
      },
    });

    const equipments = equipment?.data?.records[index];

    console.log("getCompartmentNumber2", index, item, equipments);

    return equipments?.cmptnu;
  };

  useEffect(() => {
    if (state[1]?.length > 0) {
      setFieldsValue({
        composition: state[1].map(({ etyp_id }) => ({ etyp_id })),
      });
    } else {
      setFieldsValue({
        composition: [],
      });
    }
  }, [setFieldsValue, state]);

  useEffect(() => {
    if (payload?.records) {
      const values = generator(payload?.records);

      setState([values, []]);
    }
  }, [payload]);

  return (
    <Form.Item name="composition">
      <Input.Search placeholder={`Search By Equipment`} onSearch={onSearch} />
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}>
        <DragDropContext onDragEnd={onDragEnd} direction="horizontal">
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`} direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver, ind)}
                  {...provided.droppableProps}
                >
                  {el.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Tooltip title={item.etyp_title}>
                            <div style={{ padding: ind === 1 ? 2 : 5 }}>
                              <div
                                style={{
                                  display: 'flex',
                                  height: 73,
                                }}
                              >
                                {item?.image?.split(',')?.map((image, index) => (
                                  <>
                                    <Equipment
                                      image={image}
                                      key={index}
                                      //this showed same title under every trailer
                                      //showName={item.etyp_title}
                                      style={{
                                        height: '100%',
                                        objectFit: 'contain',
                                        objectPosition: '0 0',
                                        marginRight:
                                          image === 'P' && image?.length > 1 && ind === 1 ? -50 : 0,
                                      }}
                                    />

                                    {image !== 'P' && image !== 'F' && (
                                      <>
                                        <a onClick={() => onShowCompartments(item, index)}>
                                          <Badge count={getCompartmentNumber(item, index)} offset={[-50, 15]} />
                                        </a>
                                      </>
                                    )}
                                  </>
                                ))}

                                {ind === 1 && (
                                  <a onClick={() => onRemove(index)}>
                                    <Badge
                                      count="X"
                                      style={{ background: 'white', color: 'black' }}
                                      offset={[-25, 0]}
                                    />
                                  </a>
                                )}
                              </div>
                            </div>
                            {/* <Divider orientation="center"><b>{item.etyp_title}</b></Divider> */}
                            <div style={{textAlign: 'center'}}><b>{item.etyp_title}</b></div>
                          </Tooltip>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </Form.Item>
  );
};

export default Combination;
