/* Mengelola struktur database seperti create table, alter table, atau drop table dengan 
kode JavaScript menggunakan node-pg-migrare */

/* npm run migrate create ‘<migration name>’ untuk membuat migration (aksi/perubahan database) */
/* eslint-disable camelcase */

exports.shorthands = undefined;

// migration utama
exports.up = (pgm) => {
  pgm.createTable("notes", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    title: {
      type: "TEXT",
      notNull: true,
    },
    body: {
      type: "TEXT",
      notNull: true,
    },
    tags: {
      type: "TEXT[]",
      notNull: true,
    },
    created_at: {
      type: "TEXT",
      notNull: true,
    },
    updated_at: {
      type: "TEXT",
      notNull: true,
    },
  });
};

// migration rollback
exports.down = (pgm) => {
  pgm.dropTable("notes");
};
