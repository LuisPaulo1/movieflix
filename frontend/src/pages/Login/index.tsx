import { AuthContext } from 'AuthContext';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { getTokenData } from 'util/auth';
import { requestBackendLogin } from 'util/requests';
import { saveAuthData } from 'util/storage';

import './styles.css';

type FormData = {
    username: string;
    password: string;
}

type LocationState = {
    from: string;
}

const Login = () => {

    const location = useLocation<LocationState>();

    const { from } = location.state || { from: { pathname: '/movies' } };

    const { setAuthContextData } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [hasError, setHasError] = useState(false);

    const history = useHistory();

    const onSubmit = (formData : FormData) => {
        requestBackendLogin(formData)
        .then(response => {
            saveAuthData(response.data);
            setHasError(false);
            setAuthContextData({
                authenticated: true,
                tokenData: getTokenData()
            });
            history.replace(from);
        })
        .catch(error => {
            setHasError(true);      
        });
    };

    return (
        <div className="login-card">
            <h1>LOGIN</h1>
            { hasError && (
                <div className="alert alert-danger mensagens">
                    Erro ao tentar efetuar o login
                </div>
            )}    
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="login-input">
                    <input 
                        {...register("username", {
                            required: 'Campo obrigatório',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Email inválido' 
                            }
                        })}
                        type="text"                        
                        placeholder="Email"
                        name="username"
                    />
                    <div className="invalid-feedback d-block">{errors.username?.message}</div>
                </div>
                <div className="login-input">
                    <input 
                        {...register("password", {
                            required: 'Campo obrigatório'                            
                        })}
                        type="password"                         
                        placeholder="Senha" 
                        name="password" 
                    />
                    <div className="invalid-feedback d-block">{errors.password?.message}</div>
                </div>
                <div className="login-submit">
                    <button>Fazer Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;