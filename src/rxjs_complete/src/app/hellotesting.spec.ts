import { Person } from './person';

describe('my first test', () => {
    let sut: {a: number};
    beforeEach(() => {
        sut = {
            a: 0
        };
    });
    it('should be 2 if set to 2', () => {
        // arrange
        sut.a = 1;
        // act
        sut.a = 2;
        // assert
        expect(sut.a).toBe(2);
    });
});

describe('a person test', () => {
    let person: Person;
    beforeEach(() => {
        person = new Person('John', 'Doe');
    });
    it('should spy on property', () => {
        const spy = spyOnProperty(person, 'fullName').and.returnValue('dummy stubbed name');
        expect(person.fullName).toBe('dummy stubbed name');
        expect(spy).toHaveBeenCalled();
    });
    it('should spy on method', () => {
        function stub() {
            return 26;
        }
        const spy = spyOn(person, 'someMethod').and.returnValue(stub());
        expect(person.someMethod()).toBe(26);
        expect(spy).toHaveBeenCalled();
    });
});

