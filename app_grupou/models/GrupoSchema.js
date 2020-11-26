class GrupoSchema {
  constructor(nome, email) {
    this.NomeGrupo = nome;
    this.Ativo = 1;
    this.Mensagens = [];
    this.Users = [email];
  }
}

export default GrupoSchema;
