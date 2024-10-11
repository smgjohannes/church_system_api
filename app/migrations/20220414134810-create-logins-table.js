

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('logins', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            success: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            identity: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            user_agent: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            ip_address: {
                allowNull: false,
                type: Sequelize.STRING(45),
            },
            timestamp: {
                allowNull: false,
                type: Sequelize.BIGINT,
            },
            count: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('logins');
    },
};
