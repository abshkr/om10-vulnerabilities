
-- Add enums for Loading Bay Types

insert into msg_lookup values(3104, 'ENG', 'Unloading');
insert into msg_lookup values(3104, 'CHN', '��Ʒж��');

insert into ENUMITEM values('LOAD_BAY_TYPES', 5, 3104);

commit;
