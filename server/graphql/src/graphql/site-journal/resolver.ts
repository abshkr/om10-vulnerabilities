import { SiteJournal } from '../../entity';
import { createQueryBuilder } from 'typeorm';
import { CONFIG } from '../../constants';

const getAll = (before, after) => {
  const query = `SITE_JOURNAL.generatedAt >= TO_TIMESTAMP(:after, '${CONFIG.DATABASE_TIME_FORMAT}') 
  AND SITE_JOURNAL.generatedAt <= TO_TIMESTAMP(:before, '${CONFIG.DATABASE_TIME_FORMAT}')
  `;

  const payload = createQueryBuilder(SiteJournal, 'SITE_JOURNAL')
    .where(query, { before, after })
    .getMany();

  return payload;
};

export const resolver = {
  Query: {
    siteJournal: (context, { before, after }) => {
      return getAll(before, after);
    }
  }
};
