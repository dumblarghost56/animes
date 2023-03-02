CREATE DATABASE hentai;

USE hentai;

CREATE TABLE posts(
  id INT NOT NULL AUTO_INCREMENT,
  title TEXT NOT NULL,
  thumbnail TEXT,
  id_chapter TEXT,
  PRIMARY KEY(id),
  FULLTEXT KEY buscador(title) 
)ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE chapters(
	id INT  NOT NULL AUTO_INCREMENT,
	id_chapter TEXT NOT NULL,
	indice TEXT NOT NULL,
	fecha DATE,
	thumbnail TEXT,
	id_link TEXT,
	PRIMARY KEY(id)
)ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE links(
	id INT NOT NULL AUTO_INCREMENT,
	id_link TEXT NOT NULL,
	server TEXT NOT NULL,
	link TEXT,
	PRIMARY KEY(id)
)ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1; 

CREATE TABLE servers(
	id INT NOT NULL AUTO_INCREMENT,
	server TEXT NOT NULL,
	PRIMARY KEY(id)
)ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

INSERT INTO servers(server) VALUES
	("mega"),
	("fembed"),
	("yourupload"),
	("netu");
