package unifor.vortex.indicacao.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tb_usuarios")
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String senhaHash;
    @Column(nullable = false)
    private int pontuacao;

    public UserModel(String nome, String email, String senha){
        this.nome = nome;
        this.email = email;
        this.senhaHash = senha; //implementar sistema de Hash
        this.pontuacao = 0;
    }

    public void novoAcesso() {
        this.pontuacao ++;
    }
}
