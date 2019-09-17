import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'GUI_SITE_JOURNAL' })
class SiteJournal {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'JNL_CAT' })
  journalCat: string;

  @Column({ name: 'SEQ' })
  sequence: string;

  @Column({ name: 'MESSAGE' })
  message: string;

  @Column({ name: 'MSG_CLASS' })
  messageClass: string;

  @Column({ name: 'MSG_EVENT' })
  messageEvent: string;

  @Column({ name: 'COMPANY_CODE' })
  companyCode: string;

  @Column({ name: 'PRINT_DATE' })
  printDate: string;

  @Column({ name: 'REGION_CODE' })
  regionCode: string;

  @Column({ name: 'GEN_DATE' })
  generatedAt: Number;
}

export default SiteJournal;
