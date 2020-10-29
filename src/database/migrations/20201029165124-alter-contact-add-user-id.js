"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn("Contacts", "userId", {
        type: Sequelize.INTEGER,
        after: "id",
        // This way does not work to add foreign key, need more research!
        // foreignKey: true,
        // references: {
        //   model: {
        //     tableName: "Users",
        //     schema: "schema",
        //   },
        //   key: "id",
        // },
        allowNull: true,
        transaction,
      });
      await queryInterface.addConstraint("Contacts", {
        fields: ["userId"],
        type: "foreign key",
        name: "userId_fkey_foreign",
        references: {
          table: "Users",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint("Contacts", "userId_fkey_foreign", {
        transaction,
      });
      await queryInterface.removeColumn("Contacts", "userId", { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
