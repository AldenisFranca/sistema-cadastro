-- Criação da Base de Dados
create database tutorial;

-- Criação da Tabela dos Usuários
create table usuarios (
  id int auto_increment primary key,
  nome varchar(255),
  login varchar(100) not null,
  password varchar(256) not null
);

-- Inserção dos Usuários
INSERT INTO usuarios (nome, login, password) VALUES
('Alberto José da Costa','alberto','alberto1'),
('Joana Amorim Galvão','joana','joana1'),
('Aldenis Alves de França','aldenis','aldenis1');

-- Atualização com a senha criptografada
UPDATE usuarios SET password = '$2a$10$9TdXhTMJvo72FS2S1zOJV.65Wz8u2y7MGsMpdUFnYh9XmdeMoh5YO' where login = 'alberto';
UPDATE usuarios SET password = '$2a$10$9TdXhTMJvo72FS2S1zOJV.49AeZ2YsAWaPoRJyQoN4SSvwv9aLd0q' where login = 'joana';
UPDATE usuarios SET password = '$2a$10$9TdXhTMJvo72FS2S1zOJV.owzZTugJ89gWTXRJf3HlH0fFpemM0E6' where login = 'aldenis';

-- Consultar a Tabela usuarios
select * from usuarios;

-- --------------------------------------------------------------------------------------------------------------------------

-- Criação da Tabela dos Funcionários
create table funcionarios (
  id int auto_increment primary key,
  nome varchar(255) unique not null,
  data_nasc date,
  email varchar(255),
  cargo varchar(255) 
);

-- Inserção dos Funcionários
INSERT INTO funcionarios (nome, data_nasc, email, cargo) VALUES
('Carla Dantas de Souza', '1996-05-15', 'carla@gmail.com', 'Desenvolvedor Pleno'),
('Marcos Augusto Rodrigues', '1984-05-12', 'marcos@gmail.com', 'Engenheiro de Software'),
('José Maciel de Paula', '1996-05-15', 'jose@gmail.com', 'Arquiteto de Software'),
('Maria do Carmo Gomes', '2000-07-18', 'maria@gmail.com', 'Desenvolvedor Sênior');

-- Consultar a Tabela funcionarios
select * from funcionarios;
