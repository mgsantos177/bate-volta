import React from 'react';
import { TouchableOpacity } from 'react-native';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useNavigation } from '@react-navigation/native';
import Background from '../../../../components/Background/home';
import { Container, List, Hour, QuestionLinkText, QuestionLink } from './styles';
import { QuestionBox, QuestionText, AnswerBox, AnswerText, Separator } from '../styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AllQuestions = ({ route }) => {
  const { questions, event } = route.params;
  const navigation = useNavigation();


  return (
    <Background>
      <Container>
        {questions ? (
          <>
            <List
              data={questions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) =>
                <>
                  <TouchableOpacity>
                    <QuestionBox>
                      <Icon name="chat" size={20} color={'#999'} />
                      <QuestionText>{item.comentario}</QuestionText>
                    </QuestionBox>
                    {item.answer_id ?
                      <>
                        <AnswerBox>
                          <Icon name="chat" size={15} color={'#ccc'} />
                          <AnswerText>{item.answer_id.comentario}</AnswerText>
                        </AnswerBox>
                        <Hour>{formatRelative(parseISO(item.answer_id.createdAt), new Date(), {
                          locale: pt,
                        })}</Hour>
                      </> :
                      <Hour>{formatRelative(parseISO(item.createdAt), new Date(), {
                        locale: pt,
                      })}</Hour>
                    }
                  </TouchableOpacity>
                  <Separator />
                </>
              }
            />
          </>) : <AnswerText> Nenhuma pergunta até o momento </AnswerText>}
        <QuestionLink onPress={() => navigation.navigate('newQuestion', { event})}>
          <QuestionLinkText>
            Perguntar
                </QuestionLinkText>
        </QuestionLink>
      </Container>
    </Background>);
}

export default AllQuestions;
