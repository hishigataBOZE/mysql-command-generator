var clipboard = new Clipboard('.Clipboard');

clipboard.on('success', function(e) {
  console.info('Action:', e.action);
  console.info('Text:', e.text);
  console.info('Trigger:', e.trigger);

  e.clearSelection();
});

var app =   new Vue({
  el: "#app",
  data: {
    dbname: '',
    username: '',
    hostname: '',
    password: '',
  },
  methods: {},
  computed: {
    createFullUser: function () {
      var sql = "#COMMAND# #ROLE# `#DB#`.* TO `#USER#`@`#HOST#` IDENTIFIED BY '#PSWD#';";
      var command = "GRANT";
      var role = "ALL PRIVILEGES ON";

      sql = sql.replace('#COMMAND#', command);
      sql = sql.replace('#ROLE#', role);
      sql = sql.replace('#DB#', this.dbname);
      sql = sql.replace('#USER#', this.username);
      sql = sql.replace('#HOST#', this.hostname);
      sql = sql.replace('#PSWD#', this.password);

      return sql;
    },
    createCrudUser: function () {
      var sql = "#COMMAND# #ROLE# `#DB#`.* TO `#USER#`@`#HOST#` IDENTIFIED BY '#PSWD#';";
      var command = "GRANT";
      var role = "SELECT,UPDATE,INSERT,DELETE";

      sql = sql.replace('#COMMAND#', command);
      sql = sql.replace('#ROLE#', role);
      sql = sql.replace('#DB#', this.dbname);
      sql = sql.replace('#USER#', this.username);
      sql = sql.replace('#HOST#', this.hostname);
      sql = sql.replace('#PSWD#', this.password);

      return sql;
    },
    showUserList: function () {
      var sql = "SELECT user,host FROM mysql.user;";
      return sql;
    },
    showGrant: function () {
      var sql = "#COMMAND# `#USER#`@`#HOST#`;";
      var command = "SHOW GRANTS FOR";

      sql = sql.replace('#COMMAND#', command);
      sql = sql.replace('#USER#', this.username);
      sql = sql.replace('#HOST#', this.hostname);

      return sql;
    },
    changePswd: function () {
      var sql = "#COMMAND# `#USER#`@`#HOST#`=password('#PSWD#');";
      var command = "SET PASSWORD FOR";

      sql = sql.replace('#COMMAND#', command);
      sql = sql.replace('#USER#', this.username);
      sql = sql.replace('#HOST#', this.hostname);
      sql = sql.replace('#PSWD#', this.password);

      return sql;
    },
    dropUser: function () {
      var sql = "#COMMAND# `#USER#`@`#HOST#`;";
      var command = "DROP user";

      sql = sql.replace('#COMMAND#', command);
      sql = sql.replace('#USER#', this.username);
      sql = sql.replace('#HOST#', this.hostname);

      return sql;
    }
  }
});
